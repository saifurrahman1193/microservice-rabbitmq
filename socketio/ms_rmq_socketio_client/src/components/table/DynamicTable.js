// ** MUI Imports
// import TableStickyHeader from 'src/components/table/TableStickyHeader';
import TableBasic from 'src/components/table/TableBasic';

const componentMap = {
    // 'sticky-header': TableStickyHeader,  // incomplete component
    'basic': TableBasic,
};

const DynamicTable = (props) => {

    return (
        <DynamicComponent {...props} />
    )
}

function DynamicComponent(props) {
    const SelectedComponent = componentMap[props?.tableType] || TableBasic;

    return <SelectedComponent {...props} />;
}

export default DynamicTable


// Dynamic Component Rendering with Component Mapping
