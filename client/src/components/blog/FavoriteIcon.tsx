import React, { MouseEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IBlogPost } from '../../App';

type TFaveProps = { 
    post: IBlogPost; 
    favorites: number[]; 
    setFavorites: (favorites:React.SetStateAction<number[]>)=>void 
};

const FavoriteIcon = ({ post, favorites, setFavorites }:TFaveProps) => {
    const [isFave, setIsFave] = useState<boolean>(favorites.some(num => num === post.blogID));
    const [faveIcon, setFaveIcon] = useState<IconProp>(isFave ? fasFaHeart : farFaHeart);

    //useEffect - on favorites update, send put request to db containing with new array (set, don't append)

    const changeFavorites = (e:MouseEvent<SVGSVGElement>, post:IBlogPost):void => {
        console.log(isFave);
        let newFaves:number[];
        if(isFave) {
            setIsFave(false);
            setFaveIcon(farFaHeart);
            let faveIndex = favorites.indexOf(post.blogID);
            newFaves = favorites;
            newFaves.splice(faveIndex, 1)
            setFavorites(newFaves);
        } else {
            setIsFave(true)
            setFaveIcon(fasFaHeart);
            setFavorites([...favorites, post.blogID]);
        }
        console.log(favorites);
    }

    return (
        <FontAwesomeIcon className='font-icon' icon={faveIcon} 
            size="2x" title={isFave ? "Remove from favorites" : "Add to Favorites"}
            onClick={(e) => changeFavorites(e, post)}/>
    )
}

export default FavoriteIcon;
