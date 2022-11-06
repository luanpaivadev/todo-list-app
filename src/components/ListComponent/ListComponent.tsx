import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
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

        <Box>
            
            <List sx={{
                width: '100%',
                maxHeight: 360,
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

                                        <Grid container>
                                            <Grid item xs={11}>
                                                <div onClick={() => props.done(task)}>
                                                    <ListItemText sx={{ textAlign: 'justify', mr: 4 }}
                                                        primary={`#${task.id} - ${task.description}`} />
                                                    <Grid item>
                                                        {
                                                            task.alarm && <small>{`Alarm in ${task.alarm}`}</small>
                                                        }
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1}
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center">
                                                <ListItemIcon>
                                                    {
                                                        !task.completed
                                                            ? <EditIcon onClick={() => props.update(task)} />
                                                            : <DeleteIcon onClick={() => props.delete(task)} />
                                                    }
                                                </ListItemIcon>
                                            </Grid>
                                        </Grid>

                                    </ListItemButton>

                                </ListItem>

                                <Divider sx={{ border: '1px solid #fff' }} />
                            </div>
                        ))
                        : <p className="form-text text-center">Lista sem tarefas.</p>
                }
            </List>

        </Box>


    );
}