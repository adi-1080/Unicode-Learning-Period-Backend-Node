const Student           = require('../models/student-model');

// Show the list of Students
const index = async(req,res,next) => {
    try{
        const result = await Student.find();
        res.json({
            "list-of-students": result,
        });
    }
    catch(error){
        res.json({
            "message": "An error occurred!",
            "reason": error
        });
    }
};

// Show single student
const show = async(req,res,next) => {
    let studentID = req.body.studentID;
    try{
        const result = await Student.findById(studentID);
        res.json({result});
    }
    catch(error){
        res.json({error});
    }
};

// Add new student
const store = async(req,res,next) => {
    let student = new Student({
        sapid: req.body.sapid,
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact
    });

    try{
        const result = await student.save();
        res.json({
            message: "Student added successfully",
            'msg-result': result
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Update a student
const update = async(req,res,next) => {
    let studentID = req.body.studentID;

    // Input updated data from user
    let updatedData = {
        sapid: req.body.sapid,
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact
    };

    try{
        await Student.findByIdAndUpdate(studentID, { $set: updatedData });
        res.json({
            message: "Student updated successfully"
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Delete a student
const destroy = async(req,res,next) => {
    let studentID = req.body.studentID;

    try{
        await Student.findByIdAndDelete(studentID);
        res.json({
            message: "Student deleted successfully"
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Exporting the CRUD operations's functions that we just made above in the controller
module.exports = {
    index, show, store, update, destroy
};
