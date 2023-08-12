const CheckProgram = (req, res, next) => {
    const validPrograms = ['nodejs', 'python', 'product'];

    if (!validPrograms.includes(req.body.program)) {
        return res.status(422).json({
            data: null,
            error: 'Invlid program, use nodejs, python or product'
        })
    }

    next()
}

module.exports = {
    CheckProgram
}