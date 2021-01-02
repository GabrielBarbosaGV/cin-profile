export const scrolling = (
    node: HTMLElement,
    predicate: (scrollTop: number) => boolean
)  => {
    const predicateTrue = () => predicate(window.scrollY);

    const emitEventOnPredicate = () => {
        if (predicateTrue())
            node.dispatchEvent(new CustomEvent('hit'));
        else node.dispatchEvent(new CustomEvent('unhit'));
    }

    window.addEventListener('scroll', emitEventOnPredicate);

    return {
        destroy: () => {
            window.removeEventListener("scroll", emitEventOnPredicate);
        },
        update: (newPredicate: (scrollTop: number) => boolean) => {
            predicate = newPredicate;
        }
    }
}
