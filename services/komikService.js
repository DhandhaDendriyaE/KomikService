async function createKomik(database, komikData) {
    const { title, author, description, imagetype, imageName, ImageData } = komikData;

    if (!title || !author || !description) {
        throw new Error('Title, author, and description are required fields.');
    }
    const newKomik = await database.Komik.create({
        title,
        author,
        description,
        imagetype: imagetype || null,
        imageName: imageName || null,
        imageData: imageData || null
    });
    return newKomik;
}

async function getAllKomiks(database) {
    const komiks = await database.Komik.findAll();

    return komiks.map(k => {
        if (k.imageData) {
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    })
}

async function getKomikById(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error('Komik not found');
    }
    if (komik.imageData) {
        komik.imageData = komik.imageData.toString('base64');
    }
    return komik;
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }
    await komik.update(komikData);
    return komik;
}
async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }
    await komik.destroy();
    return { message: `Komik dengan ID ${id} telah dihapus` };
}

module.exports = {
    createKomik,
    getAllKomiks,   
    getKomikById,
    updateKomik,
    deleteKomik
};
