import React from 'react'
import {Image,CloudinaryContext,Transformation} from 'cloudinary-react';

class PhotoItem extends React.Component{
  constructor(props) {
    super(props);
  }

  onDelete(){
    this.props.onDeletePhoto(this.props.photo);
  }

  render(){
    var image = this.props.photo.url.replace("http://rodcocr.com/","").replace("https://rodcocr.com/","");

    return <div className="slds-size--2-of-12 slds-m-right_small">
      <div className="slds-file slds-file_card">
        <figure>
          <a href={this.props.photo.url} style={{minHeight: this.props.height }} className="slds-file__crop">
            <CloudinaryContext cloudName="rodco">
                <Image publicId={ image }>
                    <Transformation height="150" crop="scale"/>
                </Image>
            </CloudinaryContext>

          </a>
          <figcaption className="slds-file__title slds-file__title_card">
            <div className="slds-media slds-media_small slds-media_center">
              <div className="slds-media__figure slds-line-height_reset">
                <button onClick={this.onDelete.bind(this)} data-col="name" className="slds-button slds-float_right slds-button_icon">
                <svg className="slds-button__icon slds-float_right" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                  </svg>
                  </button>

              </div>
              <div className="slds-media__body">
                <span className="slds-file__text slds-truncate" title="Proposal.pdf"></span>

              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  }
}

export default PhotoItem;