import { Grid, Typography, Paper, CssBaseline } from '@mui/material';
import { Box, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Footer } from './Footer';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: '#f44336',
        },
    },
});
const App = () => {
    const [historyListItem, setHistoryListItem] = useState([])
    const [budget, setBudget] = useState(0)
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)

    const [formData, setFormData] = useState({
        text: '',
        amount: '',
    });


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const randomId = Math.random().toString(36).substring(7);

        const newItem = {
            id: randomId,
            text: formData.text,
            amount: formData.amount,
        };
        if (Number(formData.amount) > 0) {
            setIncome(income + Number(formData.amount))
        } else {
            setExpense(expense + Number(formData.amount))
        }
        setBudget(budget + Number(formData.amount))
        setHistoryListItem(items => [...items, newItem])
        setFormData({ text: '', amount: '' })
    };

    const handleDelete = (event, itemId,amount) => {
        event.preventDefault(); 
        const updatedState = historyListItem.filter(item => item.id !== itemId);
        if (Number(amount) > 0) {
            setIncome(income - Number(amount))
        } else {
            setExpense(expense - Number(amount))
        }
        setBudget(budget - Number(amount))
        setHistoryListItem(updatedState);
    };
    return (
        <>
            <ThemeProvider theme={theme}>


                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    marginTop={2}
                    maxWidth="100%"
                >
                    <Grid item xs={12} sm={6} md={4} >
                        <Paper style={{ padding: 16, textAlign: 'center', backgroundColor: 'white', boxShadow: '0px 4px 6px black' }}  >
                            <Typography sx={{ color: 'Black' }} variant="h4">Expense Tracker</Typography>
                            <Divider sx={{ backgroundColor: "purple", height: 2, marginTop: '5px' }} />

                            <Typography sx={{ textAlign: 'left', marginTop: '10px', fontSize: '18px' }} variant="body1">Balance</Typography>
                            <Typography sx={{ textAlign: 'left', fontWeight: '300' }} variant="h5">${budget}</Typography>


                            <Box display="flex" boxShadow={3} justifyContent="center" alignItems="center" flexDirection="row">
                                <Typography variant="body1" style={{ marginRight: '8px', color: 'green', textTransform: 'uppercase' }}>
                                    Income
                                    <Typography variant="body2" style={{ marginRight: '8px', color: 'green' }}>
                                        ${income}
                                    </Typography>
                                </Typography>

                                <Divider orientation="vertical" flexItem />

                                <Typography variant="body1" style={{ marginLeft: '8px', color: 'red', textTransform: 'uppercase' }}>
                                    Expense
                                    <Typography variant="body2" style={{ marginLeft: '8px', color: 'red', }}>
                                        ${expense}
                                    </Typography>
                                </Typography>
                            </Box>




                            <Typography sx={{ textAlign: 'Left', color: 'black', marginTop: '10px' }} variant="h5">History</Typography>
                            <Divider sx={{ backgroundColor: 'grey', height: 2, marginTop: '5px' }} />

                            <List sx={{ justifyContent: "center", alignItems: 'center' }}>

                                {historyListItem.map(x =>
                                    <ListItem key={x.id}>

                                        <ListItemText primary={x.text} />
                                        <ListItemText primary={x.amount} sx={{ textAlign: "right", color: x.amount > 0 ? 'green' : 'red' }} />


                                        {/* Delete button */}
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={(event) => handleDelete(event, x.id, x.amount)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                    </ListItem>

                                )}

                            </List>

                            {historyListItem.length === 0 && (

                                <Typography variant='body1'>No history yet</Typography>
                            )}



                            <Typography sx={{ textAlign: 'Left', color: 'black', marginTop: '10px' }} variant="h5">Add new transaction</Typography>
                            <Divider sx={{ backgroundColor: 'grey', height: 2, marginTop: '5px' }} />

                            <form onSubmit={handleSubmit}>
                                <Box p={2}>

                                    <TextField
                                        fullWidth
                                        placeholder="Enter Text..."
                                        variant="outlined"
                                        name="text"
                                        type='text'
                                        required={true}
                                        value={formData.text}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        fullWidth

                                        placeholder='Enter Amount...'
                                        variant="outlined"
                                        name="amount"
                                        type='number'
                                        required={true}
                                        value={formData.amount}
                                        onChange={handleChange}
                                        helperText="(negative-exense,positive-income)"
                                    />
                                </Box>

                                <Box p={2}>
                                    <Button type="submit" variant="contained" color='primary' >
                                        Add transaction
                                    </Button>
                                </Box>
                            </form>

                        </Paper>
                    </Grid>
                </Grid>
            </ThemeProvider>

            <Footer></Footer>

        </>
    );
};

export default App;
