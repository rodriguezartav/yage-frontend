import React from 'react'
import PickList from '../picklist'
import Style from "./style.css";
import PhotoItem from "./photoItem"

class Photos extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      url: null
    }
  }

  onUrlChange(e){
    this.setState({url: e.currentTarget.value});
  }

  onUploadFile(e){
    var _this = this;
    var file = e.currentTarget.files[0];
    _this.props.onUploadImage(file);
  }

  onDeletePhoto(photo){
    this.props.onDeletePhoto(photo);
  }

  onSaveUrl(){
    this.props.onUploadImageURL(this.state.url);
  }

  renderPhotoItems(photos){
    var _this = this;
    return photos.map(function(photo){
      return <PhotoItem onDeletePhoto={_this.onDeletePhoto.bind(_this)} height={_this.props.height} key={photo.url} photo={photo} />
    })
  }

  renderUploadUrl(){
    return <div className="slds-form-element slds-float_right">
      <div className="slds-grid upload_url_input_button slds-m-right_small">


        <div className="slds-form-element slds-grow">
          <input onChange={this.onUrlChange.bind(this)} placeholder="Usar Link" type="text" className="slds-input" />
        </div>

        <div className="slds-form-element ">
          <button onClick={this.onSaveUrl.bind(this)} className="slds-button slds-button_icon slds-button_icon-border-filled" title="Like" aria-pressed="false">
            <svg className="slds-button__icon" aria-hidden="true">
              <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#save" />
            </svg>
            <span className="slds-assistive-text">Like</span>
          </button>
        </div>
      </div>
    </div>
  }

  renderUploadButton(){
    return <div className="slds-form-element slds-float_right">
      <div className="slds-form-element__control">
        <div className="slds-file-selector slds-file-selector_images">
          <div className="">
            <input onChange={this.onUploadFile.bind(this)} type="file" className="slds-file-selector__input slds-assistive-text" id="file-upload-input-01"/>
            <label className="slds-file-selector__body" htmlFor="file-upload-input-01" id="file-selector-secondary-label">
              <span className="slds-file-selector__button slds-button slds-button_neutral">
                <svg className="slds-button__icon slds-button__icon_left" aria-hidden="true">
                  <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#upload" />
                </svg>Upload Image</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  }

  renderPhotos(){
    var photos = this.props.photos;
    if(!photos || photos.length == 0) return null;

    return <div className="slds-grid slds-scrollable">
      {this.renderPhotoItems(photos)}
    </div>
  }

  render(){
    return <div >
      <div className="slds-text-heading_small ">
        Lista de Fotos
        {this.renderUploadButton()}
        {this.renderUploadUrl()}
      </div>

      <div className=" slds-p-around_small">
        {this.renderPhotos()}
      </div>
    </div>
  }
}

Photos.demo = function(Highlight){
  var photos = [{url: "http://rodcocr.com/assets/7_97177.jpeg"}];
  function onDeletePhoto(){
    photos.splice(0,1);
  }

  function onUploadImage(){
    photos.push({url: "http://rodcocr.com/assets/7_97177.jpeg"})
  }

  return <div>
    <Photos height={221} onDeletePhoto={onDeletePhoto} onUploadImage={onUploadImage} photos={photos} />
    <Highlight className='dark'>
      {'<Photos  height={221} onDeletePhoto={} onUploadImage={} photos={photos} />'}
    </Highlight>
  </div>
}

export default Photos;
