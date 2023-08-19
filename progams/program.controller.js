const programs = []

const CreateProgram = (req, res) => {
    res.status(200).json({ data: programs })
}

const UpdateProgram = (req, res) => {
    res.status(200).json({ data: programs })
}


const GetPrograms = (req, res) => {
    res.status(200).json({ data: programs })
}

module.exports = {
    CreateProgram,
    UpdateProgram,
    GetPrograms
}