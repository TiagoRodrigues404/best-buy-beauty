import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { menuInit, camelize } from "../js/script";
import { setBrandId, setCurrentPage } from "../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
import MenuSkeleton from "./MenuSkeleton";
import { SearchContext } from "../App";

const SubMenuHeader = ({ menuItems }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { setCategoryTypes } = useContext(SearchContext);

    const skeletons = [...new Array(4)].map((_, index) => <MenuSkeleton key={index} />);

    const onChangeBrand = (id) => {
        dispatch(setBrandId(id));
    }

    const showCategoryTypes = () => {
        setCategoryTypes(menuItems); 
        onChangeBrand(0);
        dispatch(setCurrentPage(1));
        navigate('/produtos');
    }

    const showType = () => {
        setCategoryTypes([]);
        onChangeBrand(0);
    }

    return ( 
        <div className="bottom-header__sub-menu sub-menu-bottom-header sub-menu">
            <nav className="sub-menu__body">
                <div className="sub-menu__all" onClick={showCategoryTypes}>Ver Tudo</div>
                <ul className="sub-menu__list list-sub-menu">
                    {menuItems ? menuItems.map((type) => 
                        <li key={type.id} value={type.name} onClick={menuInit} className="sub-menu__item item-sub-menu">
                            <Link to={`/${camelize(type.name)}`} onClick={showType} className="item-sub-menu__link" >
                                {type.name}
                            </Link>
                        </li>  
                    )
                        :
                        skeletons.map((skeleton, i) => 
                            <li key={i}>
                                <MenuSkeleton/>
                            </li>
                        )  
                        
                    }
                </ul>
                <div className="list-sub-menu__back back">
                    <button onClick={menuInit} className="back__button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
                        </svg>
                        VOLTAR
                    </button>                      
                </div>    
            </nav>    
        </div>
    );
};

export default SubMenuHeader;