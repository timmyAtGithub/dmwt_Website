const images = [
    { id: 'eier_bild', fileName: 'eier.jpg' },
    { id: 'fisch_bild', fileName: 'fisch.jpg' },
    { id: 'fleisch_bild', fileName: 'fleisch.jpg' },
    { id: 'gemuesegebraten_bild', fileName: 'gemüsegebraten.jpg' },
    { id: 'huhn_bild', fileName: 'huhn.jpg' },
    { id: 'lachs_bild', fileName: 'lachs.jpg' },
    { id: 'meeresfruechte_bild', fileName: 'meeresfrüchte.jpg' },
    { id: 'nudeln_bild', fileName: 'nudeln.jpg' },
    { id: 'obst_bild', fileName: 'obst.jpg' },
    { id: 'pilze_bild', fileName: 'pilze.jpg' },
    { id: 'reis_bild', fileName: 'reis.jpg' },
    { id: 'steak_bild', fileName: 'steak.jpg' },
    { id: 'tunfischshake_bild', fileName: 'tunfischshake.jpg' },
    { id: 'doenerspiess_bild', fileName: 'dönerspieß.jpg' }
];

images.forEach((image, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = `images/${image.fileName}`;
    imgElement.alt = `Bild ${index + 1}`;
    imgElement.id = image.id;

    document.body.appendChild(imgElement);
});
