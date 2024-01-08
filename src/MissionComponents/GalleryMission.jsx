import '../CSS/Mission.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function GalleryMission() {
    const galleryData = [
        {
            name: 'corporatif',
            imageSrc: '../gallery/gallery1.png',
        },
        {
            name: 'social',
            imageSrc: '../gallery/gallery2.PNG',
        },
        {
            name: 'événementiel',
            imageSrc: '../gallery/gallery3.png',
        },
    ]

    return (
        <div className='container gallery-container'>
            <h4>Stations bien-être Loukoumotiv'</h4>
            <div className='d-flex gallery-images justify-content-between'>
                {galleryData.map((image, index) => (
                    <div key={index} className='d-flex justify-content-center align-items-center flex-column'>
                        <img src={image.imageSrc} alt={image.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GalleryMission;