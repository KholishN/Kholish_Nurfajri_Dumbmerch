/* eslint-disable react-hooks/exhaustive-deps */
import {Container} from "react-bootstrap";
import customer from "../../images/customer.jpg"
import NavigationBarAdmin from "../subComponent/NavigationBarAdmin"
import {useEffect, useState, useContext } from "react"
import {io} from "socket.io-client"
import { UserContext } from '../../context/userContext'

let socket;

function AdminComplain() {
    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })

        // define listener for every updated message
        socket.on("new message", () => {
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : 'Click here to start message'
            }))
            
            // manipulate customers to add message property with the newest message
            // code here
            setContacts(dataContacts)
        })
    }

    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }

    const loadMessages = () => {
        socket.on('messages', async (data) => {
            if(data.length > 0){
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)

                loadContacts()
            }else{
                setMessages([])
                loadContacts()
            }
        })
    }

    const onSendMessage = (e) => {
        if(e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit("send message", data)
            e.target.value = ""
        }
    }

  return (
    
    <Container >
        <NavigationBarAdmin />
        <div className="contccadmin">
            <div className="adminpage ab">
            
                {contacts.length > 0 && (
                    <div>
                        {contacts.map((item) => (
                            <div key={item.id} className={`admin a ${contact?.id === item?.id && "contact-active"}`} 
                            onClick={() => {onClickContact(item);}}
                            >
                                <div className="d-grid b">
                                    <div className="d-flex">
                                        <div className="ccleft">
                                            <img src={item.profile?.image || customer} alt="admin" 
                                            className="adminphoto"/>
                                        </div>

                                            <div className="ccright">
                                                <p className="nameComplain">{item.name}</p>
                                                <p className="messageComplain">{item.message}</p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="garisadmin">
            </div>


            <div className="costcontentadmin">
                <div className="pz">

                    {messages.map((item, index) => (
                        <div key={index}>

                <div className={ item.idSender === state.user.id ? "warpbubble" : "warpbubbleadmin warpendadmin"} >
                        <div className="bubble">
                        {item.idSender === state.user.id && (
                            <img src={contact.profile?.image || customer} alt="chat" className="imgmsgcost" />
                            )}
                        </div>
                        <div className={ item.idSender === state.user.id ? "chat" : "chatadmin"}>
                            <p>{item.message}</p>
                        </div>
                    </div>
                    </div>
                    ))}

                        <input type="text" className="messagecostadmin" placeholder="Sand Message..."  onKeyPress={onSendMessage}/>
                </div>
            </div>
            </div>
            </div>
    </Container>
  ) 
}

export default AdminComplain