const DepartmentModel = require('../models/department.model');

const getDepartments = async () => {

    const departments = await DepartmentModel.find({});

    return {
        code: 200,
        success: true,
        message: 'Departments fetched successfully',
        data: {
            departments
        }
    }
}

const createDepartment = async (department) => {

    const departmentFromRequest = department;

    const newDepartment = new DepartmentModel();

    newDepartment.name = departmentFromRequest.name;
    newDepartment.description = departmentFromRequest.description;

    const savedDepartment = await newDepartment.save();

    return {
        code: 200,
        success: true,
        message: 'Department created successfully',
        data: {
            department: savedDepartment
        }
    }
}   

module.exports = {
    getDepartments,
    createDepartment
}