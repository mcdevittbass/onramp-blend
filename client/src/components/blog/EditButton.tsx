import React, { SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { IBlogPost } from '../../App';

type TEditProps = {post: IBlogPost, setCurrentToEdit: (currentToEdit:SetStateAction<IBlogPost | null> )=>void;}
const EditButton = ({ post, setCurrentToEdit }: TEditProps) => {
    const history = useHistory();

    const handleEdit = () => {
        setCurrentToEdit(post);
        history.push('/main/write');
    }

    return (
        <FontAwesomeIcon className='font-icon' icon={faEdit} size="2x" title="Edit this post"
                        onClick={handleEdit}/>
    )
}

export default EditButton;