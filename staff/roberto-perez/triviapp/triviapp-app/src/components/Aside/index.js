import React from 'react';

function Aside({ children }) {
	return (
		<aside className="sidebar">
			<div className="sidebar__scrolling-content">
				<div className="sidebar__scrolling-content-scroll">
                    {children}
				</div>
			</div>
		</aside>
	);
}

export default Aside;
