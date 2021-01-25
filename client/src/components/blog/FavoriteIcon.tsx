import React, { MouseEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IBlogPost } from '../../App';

type TFaveProps = { 
    post: IBlogPost; 
    favorites: IBlogPost[]; 
    setFavorites: (favorites:React.SetStateAction<IBlogPost[]>)=>void 
};

const FavoriteIcon = ({ post, favorites, setFavorites }:TFaveProps) => {
    const [faveIcon, setFaveIcon] = useState<IconProp>(post.favorite ? fasFaHeart : farFaHeart)

    const changeFavorites = (e:MouseEvent<SVGSVGElement>, post:IBlogPost):void => {
        //send put request to db to change favorite
        let updated:IBlogPost;
        let newFaves: IBlogPost[];

        updated = {...post, favorite: !post.favorite}

        //reasses this method...
        if(faveIcon === farFaHeart) {
            setFaveIcon(fasFaHeart);
            newFaves = [...favorites, updated];
            setFavorites(newFaves);
        } else {
            setFaveIcon(farFaHeart);
            let index = favorites.indexOf(post);
            newFaves = [...favorites];
            newFaves.splice(index, index + 1);
            setFavorites(newFaves);
        }
    }

    return (
        <FontAwesomeIcon className='font-icon' icon={faveIcon} 
            size="2x" title={post.favorite ? "Remove from favorites" : "Add to Favorites"}
            onClick={(e) => changeFavorites(e, post)}/>
    )
}

export default FavoriteIcon;
