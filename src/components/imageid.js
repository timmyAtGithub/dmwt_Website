
const imageFileNames = [
    'eier',
    'fisch',
    'fleisch',
    'gemüsegebraten',
    'huhn',
    'lachs',
    'meeresfrüchte',
    'nudeln',
    'obst',
    'pilze',
    'reis',
    'steak',
    'tunfischshake',
    
  ];
  
  
  const imageIds = imageFileNames.map((fileName, index) => {

    return `image${index + 1}`; 
  });
  
  
  console.log(imageIds);
  

  imageIds.forEach((id, index) => {
   
    const imgElement = document.createElement('img');
    imgElement.src = `images/${imageFileNames[index]}`; 
    imgElement.alt = `Bild ${index + 1}`;
    imgElement.id = id;
  
    
    document.body.appendChild(imgElement);
  });
  