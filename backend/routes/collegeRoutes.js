const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjusted path

// Get all colleges
router.get('/getAll', (req, res) => {
    db.query('SELECT * FROM collegebasics', (err, results) => {
        if (err) {
            console.error('Error fetching colleges:', err);
            res.status(500).json({ error: 'Failed to fetch colleges' });
        } else {
            res.json(results);
        }
    });
});

// Get a single college by id
router.get('/:id', (req, res) => {
    const idCollege = req.params.id;
    db.query('SELECT * FROM collegebasics WHERE idCollege = ?', [idCollege], (err, results) => {
        if (err) {
            console.error('Error fetching college:', err);
            res.status(500).json({ error: 'Failed to fetch college' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'College not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Create a new college
router.post('/create', (req, res) => {
    const { collegeName, picURL, aveSAT, aveGPA, tuition, accRate, ranks, idCollegeDetails, loc } = req.body;
    
    if (!collegeName){
        res.status(500).json({ error: 'missing college name' });
    }


    db.query('INSERT INTO collegebasics (collegeName, picURL, aveSAT, aveGPA, tuition, accRate, ranks, idCollegeDetails, loc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [collegeName, picURL, aveSAT, aveGPA, tuition, accRate, ranks, idCollegeDetails, loc], 
        (err, results) => {
        if (err) {
            console.error('Error creating college:', err);
            res.status(500).json({ error: 'Failed to create college' });
        } else {
            res.status(201).json({ message: 'College created successfully', id: results.insertId });
        }
    });
});

// Update a college by id
router.put('/:id', (req, res) => {
    const idCollege = req.params.id;
    const fields = req.body;
    
    if (Object.keys(fields).length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    let query = 'UPDATE collegebasics SET ';
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query += `${key} = ?, `;
        values.push(value);
    }

    // Remove the trailing comma and space
    query = query.slice(0, -2);
    query += ' WHERE idCollege = ?';
    values.push(idCollege);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating college:', err);
            return res.status(500).json({ error: 'Failed to update college' });
        } else if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'College not found' });
        } else {
            return res.json({ message: 'College updated successfully' });
        }
    });
});



// Delete a college by id
router.delete('/:id', (req, res) => {
    const idCollege = req.params.id;
    db.query('DELETE FROM collegebasics WHERE idCollege = ?', [idCollege], (err, results) => {
        if (err) {
            console.error('Error deleting college:', err);
            res.status(500).json({ error: 'Failed to delete college' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'College not found' });
        } else {
            res.json({ message: 'College deleted successfully' });
        }
    });
});


// Return all user's liked colleges
router.get('/userLikedColleges/:userId', (req, res) => {
    const userId = req.params.userId;

    // Query to select all liked colleges for the given user ID
    const query = `
        SELECT uc.iduserlikedcolleges, uc.idusers, uc.idCollege, cb.*
        FROM userlikedcolleges uc
        JOIN collegebasics cb ON uc.idCollege = cb.idCollege
        WHERE uc.idusers = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user liked colleges:', err);
            res.status(500).json({ error: 'Failed to fetch user liked colleges' });
        } else if(results.length == 0) {
            res.status(400).json({error : "no liked colleges found for this user"})
        } else {
            res.json(results);
        }
    });
});

// add user's liked/saved college
router.put('/userLikedColleges/:idusers/:idCollege', (req, res) => {
    const idusers = req.params.idusers;
    const idCollege = req.params.idCollege;

    // Check if the user ID exists
    db.query('SELECT idusers FROM users WHERE idusers = ?', [idusers], (err, userResults) => {
        if (err) {
            console.error('Error checking user ID:', err);
            return res.status(500).json({ error: 'Failed to check user ID' });
        }

        if (userResults.length === 0) {
            return res.status(404).json({ error: 'User ID not found' });
        }

        // Check if the college ID exists
        db.query('SELECT idCollege FROM collegebasics WHERE idCollege = ?', [idCollege], (err, collegeResults) => {
            if (err) {
                console.error('Error checking college ID:', err);
                return res.status(500).json({ error: 'Failed to check college ID' });
            }

            if (collegeResults.length === 0) {
                return res.status(404).json({ error: 'College ID not found' });
            }

            // Check if the user already liked the college
            db.query('SELECT iduserlikedcolleges FROM userlikedcolleges WHERE idusers = ? AND idCollege = ?', [idusers, idCollege], (err, likedResults) => {
                if (err) {
                    console.error('Error checking liked college:', err);
                    return res.status(500).json({ error: 'Failed to check liked college' });
                }

                if (likedResults.length > 0) {
                    return res.status(409).json({ error: 'College already liked by the user' });
                }

                // Insert the new liked college into the userlikedcolleges table
                db.query('INSERT INTO userlikedcolleges (idusers, idCollege) VALUES (?, ?)', [idusers, idCollege], (err, insertResults) => {
                    if (err) {
                        console.error('Error adding liked college:', err);
                        return res.status(500).json({ error: 'Failed to add liked college' });
                    }

                    res.status(201).json({ message: 'College liked successfully', id: insertResults.insertId });
                });
            });
        });
    });
});

// delete user's liked/saved college
router.delete('/userLikedColleges/:iduserlikedcolleges', (req, res) => {
    const iduserlikedcolleges = req.params.iduserlikedcolleges;
    db.query('DELETE FROM userlikedcolleges WHERE iduserlikedcolleges = ?', [iduserlikedcolleges], (err, results) => {
        if (err) {
            console.error('Error deleting college:', err);
            res.status(500).json({ error: 'Failed to delete college' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'liked/saved college record not found' });
        } else {
            res.json({ message: 'College deleted successfully' });
        }
    });
});

module.exports = router;