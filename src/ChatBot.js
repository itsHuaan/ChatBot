import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Typography, Paper, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendMessageToChatGPT } from './api'; // Import the function

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatBoxRef = useRef(null);
    const userBgColor = '#0394fc';
    const botBgColor = '#f0f0f0';
    const chatBotName = 'ChatGPT';
    const userName = 'User';

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { sender: userName, text: input };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');

            const chatbotResponse = await sendMessageToChatGPT(input);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: chatBotName, text: chatbotResponse },
            ]);
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Paper
            elevation={3}
            sx={{
                width: '400px',
                minHeight: '500px',
                margin: '20px auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '60vh',
            }}
        >
            <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
                <Typography variant="h6">{chatBotName}</Typography>
            </Box>
            <Box
                ref={chatBoxRef}
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '10px',
                    '&::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555',
                    },
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: message.sender === userName ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                            textAlign: 'left',
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ textAlign: 'right', marginRight: '10px' }}>
                            {message.sender}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                display: 'inline-block',
                                padding: '10px',
                                color: message.sender === userName ? 'white' : 'black',
                                backgroundColor: message.sender === userName ? userBgColor : botBgColor,
                                borderRadius: '10px',
                                margin: '5px 0',
                                marginRight: '10px',
                            }}
                        >
                            {message.text}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ marginTop: '10px', flexShrink: 0 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (e.shiftKey) {
                                setInput((prev) => prev + '\n');
                                e.preventDefault();
                            } else {
                                handleSend();
                                e.preventDefault();
                            }
                        }
                    }}
                    multiline
                    minRows={1}
                    maxRows={4}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton color="primary" onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        marginTop: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& textarea': {
                                '&::-webkit-scrollbar': {
                                    width: '5px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f1f1f1',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#888',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#555',
                                },
                            },
                        },
                    }}
                />

            </Box>
        </Paper>
    );
};

export default ChatBox;
