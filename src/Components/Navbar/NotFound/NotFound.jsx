import React from 'react';
import notfoundImg from '../../../Assets/images/error.svg';
import style from '../NotFound/NotFound.module.css'
export default function NotFound() {
    return (
        <>
        <img height={600} className={`w-100 ${style.marginTop}`} src={notfoundImg} alt="not found" />
        </>
    )
}
