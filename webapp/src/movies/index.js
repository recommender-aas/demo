import React from 'react';
import {
    Datagrid,
    List,
    TextField
} from 'admin-on-rest/lib/mui';
// import { translate } from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/action/bookmark';

export const CategoryIcon = Icon;

const Genres = ({ record }) => (
    <div>{(record.genres || []).map(g => g.name).join(', ')}</div>
);

export const ItemsList = (props) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }} >
        <Datagrid >
            <TextField source="title" style={{ padding: '0 12px 0 25px' }} />
            <Genres source="genres" />
        </Datagrid>
    </List>
);


export const MoviesList = props => <ItemsList {...props} filter={{ lb: { include: 'genres' } }} />
export const RecommendationsList = props => <ItemsList {...props} filter={{
    lb: {
        userId: localStorage.getItem('userId') || 245,
        include: 'genres'
    }
}} />