export function observeStore(
// @ts-ignore
store, select, onChange) {
    let currentState;
    function handleChange() {
        const nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }
    const unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}
// @ts-ignore
export function setLanguage(newLanguage, store) {
    const action = {
        type: 'OptiContentCloud/SetState',
        currentLanguage: newLanguage
    };
    store.dispatch(action);
}
//# sourceMappingURL=Tools.js.map