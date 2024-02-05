// ===================================================================
// Sidebar navigation
// ===================================================================

export const sidebarHandler = () => {

    // Create shadow element
    const shadow = document.createElement('div');
    shadow.setAttribute('class', 'shadow');
    document.body.appendChild(shadow);

    // Close all functionallity to close active elements
    const closeAll = function () {
        document.querySelector<HTMLElement>('[data-sidebar-nav-active]')?.setAttribute('data-sidebar-nav-active', 'false');
        shadow.setAttribute('shadow-active', 'false');
    }

    // Listen for clicks
    document.addEventListener('click', function (event) {

        const targetElement = event.target as Element;

        // Check if sidebar "open" button has been clicked
        if (targetElement.hasAttribute('data-sidebar-open-btn') || targetElement.closest('[data-sidebar-open-btn]')) {
            document.querySelector<HTMLElement>('[data-sidebar-nav-active]')?.setAttribute('data-sidebar-nav-active', 'true');
            shadow.setAttribute('shadow-active', 'true');
        }

        // Check if sidebar "close" button has been clicked
        if (targetElement.hasAttribute('data-sidebar-close-btn') || targetElement.closest('[data-sidebar-close-btn]')) {
            closeAll();
        }

        // Check if the shadow has been clicked
        if (targetElement.hasAttribute('shadow-active') || targetElement.closest('[shadow-active]')) {
            closeAll();
        }
    });

}
