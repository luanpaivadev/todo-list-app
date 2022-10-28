import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Task } from "../views/HomeView";

declare interface ListComponentProps {
    taskList: Task[],
    done: (task: Task) => void,
    update: (task: Task) => void,
    delete: (task: Task) => void
}

const completed = 'list-group-item list-group-item-action list-group-item-success'
const noCompleted = 'list-group-item list-group-item-action'

export const ListComponent: React.FC<ListComponentProps> = (props) => {
    return (

        <List sx={{
            width: '100%',
            maxHeight: 480,
            position: 'relative',
            overflow: 'auto',
            '& ul': { padding: 0 },
        }}>
            {
                props.taskList.length > 0 ?
                    props.taskList.map(task => (
                        <div key={task.id}>
                            <ListItem className={task.completed ? completed : noCompleted} disablePadding>

                                <ListItemButton>

                                    <ListItemText sx={{ textAlign: 'justify', mr: 4 }}
                                        primaryTypographyProps={{ fontSize: 18 }}
                                        primary={`#${task.id} - ${task.description}`}
                                        onClick={() => props.done(task)} />

                                    <ListItemIcon>
                                        {
                                            !task.completed
                                                ? <EditIcon onClick={() => props.update(task)} />
                                                : <DeleteIcon onClick={() => props.delete(task)} />
                                        }
                                    </ListItemIcon>

                                </ListItemButton>

                            </ListItem>

                            <Divider sx={{ border: '1px solid #fff' }} />
                        </div>
                    ))
                    : <p className="form-text text-center">Lista sem tarefas.</p>
            }
        </List>

    );
}