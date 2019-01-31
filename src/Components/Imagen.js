import React from 'react';

const Imagen = (props) => {

    const {largeImageURL, likes, previewURL, tags, views} = props.imagen;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img className="card-img-top" src={previewURL} alt={tags} />
                <div className="card-body">
                    <p className="card-text">{likes} Likes</p>
                    <p className="card-text">{views} Views</p>
                    <a href={largeImageURL} target="_blank" className="btn btn-primary btn-block">Image</a>
                </div>
            </div>
        </div>
      );
}
 
export default Imagen;