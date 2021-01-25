import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { IBlogPost } from '../../App';
import { useHistory, useParams } from 'react-router-dom';

type TFaveProps = { 
    post: IBlogPost; 
    list: IBlogPost[]; 
    setList: (favorites:React.SetStateAction<IBlogPost[]>)=>void 
};

type TCheckParam = { blogID: string };

const TrashIcon = ({ post, list, setList }:TFaveProps) => {
    let { blogID }:TCheckParam = useParams();
    const history = useHistory();

    const deletePost = (id:number):void => {
        //send delete request to db
        //add "are you sure?"

        let newList = list.filter(postFromList => postFromList.blogID !== post.blogID);
        setList(newList);
        if(blogID) {
            history.push('/main');
        }
    }

    return (
        <FontAwesomeIcon className='font-icon' icon={faTrashAlt} size="2x" title="Delete this post"
                        onClick={() => deletePost(post.blogID)}/>
    )
}

export default TrashIcon;
