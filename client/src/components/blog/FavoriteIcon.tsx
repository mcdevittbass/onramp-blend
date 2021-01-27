import React, { MouseEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IBlogPost } from '../../App';
import axios from 'axios';

type TFaveProps = { 
    post: IBlogPost; 
    favorites: number[]; 
    setFavorites: (favorites:React.SetStateAction<number[]>)=>void 
};

const FavoriteIcon = ({ post, favorites, setFavorites }:TFaveProps) => {
    const [isFave, setIsFave] = useState<boolean>(favorites.some(num => num === post.blogID));
    const [faveIcon, setFaveIcon] = useState<IconProp>(isFave ? fasFaHeart : farFaHeart);

    const favesPut = async (faves:number[]) => {
        const currentToken = localStorage.getItem('jwt');
        const user = localStorage.getItem('user');
        try {
            const response = await axios({
                method: 'put',
                url: `http://localhost:3001/user/favorites/${user}/`,
                data: {
                    favorites: faves,
                },
                headers: {"Authorization" : currentToken}
                })
                console.log(response);
                return(response);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    const changeFavorites = async (e:MouseEvent<SVGSVGElement>, post:IBlogPost) => {
        let newFaves:number[];
        if(isFave) {
            setIsFave(false);
            setFaveIcon(farFaHeart);
            let faveIndex = favorites.indexOf(post.blogID);
            newFaves = favorites;
            newFaves.splice(faveIndex, 1)
            setFavorites(newFaves);
            const response = await favesPut(newFaves);
            if(response) console.log("Removed from favorites!"); 
        } else {
            setIsFave(true)
            setFaveIcon(fasFaHeart);
            newFaves = [...favorites, post.blogID];
            setFavorites(newFaves);
            const response = await favesPut(newFaves);
            if(response) console.log("Added to favorites!"); 
        }
    }

    return (
        <FontAwesomeIcon className='font-icon' icon={faveIcon} 
            size="2x" title={isFave ? "Remove from favorites" : "Add to Favorites"}
            onClick={(e) => changeFavorites(e, post)}/>
    )
}

export default FavoriteIcon;
