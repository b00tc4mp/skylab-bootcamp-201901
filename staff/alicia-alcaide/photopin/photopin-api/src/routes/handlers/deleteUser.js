/*
router.delete('/users', jsonBodyParser, (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, body: { email, password } } = req
        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.deleteUser(token, email, password)
            .then(() => res.status(204).json({ message: 'Ok, user deleted. ' }))
    },
        res)
}) */