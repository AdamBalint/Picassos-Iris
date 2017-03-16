import axios from 'axios';
import Image from '../models/Image';

export default (cb) => {
  axios.get('/styles')
    .then(({data}) => {
      let images = data.styles.map(style => {
        
        return {
          name: style.name,
          image: new Image(style.img_base64, style.ext),
        };
      });
      
      cb(images);
    })
    .catch((error) => {
      cb([]);
    });
};