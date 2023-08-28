// ** MUI Imports
import TableStickyHeader from 'src/components/table/TableStickyHeader';

const componentMap = {
    'sticky-header': TableStickyHeader,
};

const DynamicTable = (props) => {

    return (
            <DynamicComponent {...props } />
    )
}

function DynamicComponent(props) {
    const SelectedComponent = componentMap[props?.tableType] || TableStickyHeader;

    return <SelectedComponent {...props} />;
}

export default DynamicTable
