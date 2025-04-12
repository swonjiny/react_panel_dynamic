const components = import.meta.glob('/src/components/**/*.jsx', { eager: true });
const DynamicComponent = ({path}) => {
    console.log(path)
    const Component = components[path]?.default;

    console.log('여기안오내')
    // 컴포넌트가 없을 때 처리
    if (!Component) {
        console.error('Component not found:', path);
        console.log('Available components:', Object.keys(components));
        return null;
    }

    // 컴포넌트가 유효한지 확인
    if (typeof Component !== 'function') {
        console.error('Invalid component:', Component);
        return null;
    }
    console.log('Component' , Component)
    return <Component/>;
};

export default DynamicComponent
