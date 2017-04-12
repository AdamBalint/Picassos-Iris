import axios from 'axios';
import Image from '../models/Image';

export default (cb) => {
  axios.get('/styles')
    .then(({data}) => {
      let images = data.styles.map((style, index) => {
        return {
          id: index,
          name: style.name,
          image: new Image(style.img_base64, style.ext),
          quotes: style.quotes,
          unlocked: style.unlocked,
          price: style.price,
        };
      });

      cb(images);
    })
    .catch((error) => {
      cb([]);
    });
};
