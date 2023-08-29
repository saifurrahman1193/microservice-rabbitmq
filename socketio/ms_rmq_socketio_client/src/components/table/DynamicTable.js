// ** MUI Imports
import TableStickyHeader from 'src/components/table/TableStickyHeader';

// Style 
import { StyledTableHeaderCell } from 'src/components/table/style.js';

const componentMap = {
    'sticky-header': TableStickyHeader,
};

const DynamicTable = (props) => {

    return (
        <DynamicComponent {...props} />
    )
}

function DynamicComponent(props) {
    const SelectedComponent = componentMap[props?.tableType] || TableStickyHeader;

    return <SelectedComponent {...props} />;
}

export default DynamicTable


// Dynamic Component Rendering with Component Mapping
