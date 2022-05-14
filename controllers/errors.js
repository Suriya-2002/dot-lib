export const get404Page = (req, res, next) => {
    res.status(404).render('404');
};
