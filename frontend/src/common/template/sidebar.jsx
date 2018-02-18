import React from 'react';

import Menu from './menu';

class Sidebar extends React.Component{
    render(){
        return(            
            <aside className="main-sidebar">
                <section className="sidebar"> 
                    <Menu />
                </section>

            </aside>
        )
    }
}

export default Sidebar;

