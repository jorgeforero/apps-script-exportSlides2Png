/*
TENGA EN CUENTA: que en el editor de Apps Script es necesario adicionar las APIs de Slides y Drive para ejecutar el script. En el editor, puede hacerlo en Services, + ( Add Service ), buscar el ( Slides y Drive ) API y seleccionar "Add".
*/

/**
 * exportSlides2Images
 * Convierte todos los slides de una presentación dada en images PNG y las guarda en el folder dado
 * 
 * @param {string} Id - Id de la presentación de Google Slides
 * @param {string} FolderId - Id del folder en Drive donde quedaran guardadas la imágenes
 * @return {number} counter - Número de imágenes generadas 
 */
function exportSlides2Images( Id, FolderId ) {
  let counter = 0;
  let presentation = SlidesApp.openById( Id );
  let slides = presentation.getSlides();
  let folder = DriveApp.getFolderById( FolderId );
  slides.forEach( function( slide, i ) {
    // Obtiene el thumbnail de cada slide de la presentación en tamaño grande
    let thumbnail = Slides.Presentations.Pages.getThumbnail( Id, slide.getObjectId(), 
    { 'thumbnailProperties.thumbnailSize': 'LARGE' });
    // Obtiene el blob de cada slide y crea un archivo en Drive
    let response = UrlFetchApp.fetch( thumbnail.contentUrl );
    let blob = response.getBlob();
    blob.setName( `slide${i + 1}.png` );
    // Crea el archivo en el folder de Drive dado
    folder.createFile( blob );
    counter++;    
  });
  return counter;
};

/**
 * getPngs
 * Obtiene los PNGs de los slides de la presentación
 */
function getPngs() {
  let presentation = '1XhG97bgo4rTkycL5AhgcZqhW5hzOVjkHEALYE0XsSrU';
  let folder = '1DP7FOEctGFf-aRoW5H41BBMdKiZSyEiK';
  res = exportSlides2Images( presentation, folder );
  console.log( `res= ${res} ` );
};
