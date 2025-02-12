class InteractNavbar {
    private megaMenu: HTMLElement | null;
    private menuIcon: HTMLElement | null;
    private closeIcon: HTMLElement | null;
    private linksContainer: HTMLElement | null;

    constructor() {
        this.megaMenu = document.getElementById("mega-menu");
        this.menuIcon = document.querySelector(".menu-icon");
        this.closeIcon = document.querySelector(".close-icon");
        this.linksContainer = this.megaMenu?.querySelector('ul') || null;

        console.log("Interact navbar initialized");
    }

    // Initialize all events
    public run(): void {
        this.setupMenuToggle();
        this.setupLinkClickHandler();
    }

    // Toggle Mega Menu visibility
    private setupMenuToggle(): void {
        if (!this.megaMenu || !this.menuIcon || !this.closeIcon) return;

        // Combine the open and close toggle into one event listener
        [this.menuIcon, this.closeIcon].forEach((icon) => {
            icon.addEventListener("click", (e: Event) => {
                e.preventDefault();
                this.toggleMegaMenu();
            });
        });
    }

    // Handle click events on Mega Menu links using event delegation
    private setupLinkClickHandler(): void {
        if (!this.linksContainer) return;

        // Use event delegation to handle all link clicks within the menu
        this.linksContainer.addEventListener("click", (e: Event) => {
            const target = e.target as HTMLElement;

            // Ensure the clicked element is an anchor tag
            if (target.tagName.toLowerCase() === 'a') {
                e.preventDefault();
                console.log(`Link clicked: ${target.textContent}`);
                this.hideMegaMenu();
            }
        });
    }

    // Helper method to toggle the Mega Menu visibility
    private toggleMegaMenu(): void {
        if (this.megaMenu?.classList.contains("d-none")) {
            this.showMegaMenu();
        } else {
            this.hideMegaMenu();
        }
    }

    // Show the Mega Menu
    private showMegaMenu(): void {
        this.megaMenu?.classList.remove("d-none");
    }

    // Hide the Mega Menu
    private hideMegaMenu(): void {
        this.megaMenu?.classList.add("d-none");
    }
}

export default InteractNavbar;
