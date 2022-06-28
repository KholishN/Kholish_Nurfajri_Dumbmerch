/* eslint-disable react-hooks/exhaustive-deps */
import admin from "../../images/admin.png"
import {Container} from "react-bootstrap";
import NavbarCustomer from "../subComponent/NavigationBarCustomer"
import {useEffect, useState,useContext } from "react"
import {io} from "socket.io-client"
import {UserContext} from "../../context/userContext"

let socket;

function CustomerComplain() {
    const title = 'Complain';
    document.title = 'Dumbmerch | ' + title

    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [state] = useContext(UserContext);


    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
            })

        socket.on("new message", () => {
            socket.emit('load messages', contact?.id)
        })

        socket.on('connect_error', (err)=>{
            console.error(err)
        })
        loadContact()
        loadMessages()
        
        return () =>{
            socket.disconnect()}
    },[messages])

    const loadContact = () => {
        socket.emit("load admin contact")
        socket.on("admin contact", (data) => {

            const dataContact = {
                ...data,
                message: messages.length > 0 ? messages[messages.length -1].message : "Click here to start message"
            }
            
            setContacts([dataContact])
        })
    }


        const onClickContact = (data) => {
            setContact(data)
            socket.emit('load messages', data.id)
        }

        const loadMessages = () => {
            socket.on('messages', async (data) => {
                if(data.length > 0){
                    const dataMessages = data.map((item) => ({
                        idSender: item.sender.id,
                        message: item.message
                    }))
                    setMessages(dataMessages)
                    loadContact()
                }else{
                    setMessages([])
                    loadContact()
                }
            })
        }

        const onSendMessage = (e) => {
            if(e.key === "Enter"){
                const data = {
                    idRecipient: contact.id,
                    message: e.target.value
                }
    
                socket.emit('send message', data)
                e.target.value = ''
            }
        }

  return (
    <Container >
        <NavbarCustomer />
        <div className="contcc">
        {contacts.length > 0 && (
        <div>
        {contacts.map((item) => (
        <div key={item.id} className={`admin a ${contact?.id !== item?.id && "contact-active"}`} onClick={() => {onClickContact(item);}}>
            <div className="d-grid b">
            <div className="d-flex">
            <div className="ccleft">
            <img src={item.profile?.image || admin} alt="admin" className="adminphoto"/>
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
            <div className="garis">
            </div>
            
            <div className="costcontent">
                <div className="p">
                {messages.map((item, index) => (
                   <div key={index}>
                <div className={ item.idSender !== state.user.id ? "warpbubbleadmin warpendadmin" : "warpbubble "} >
                        <div className="bubble">
                        {item.idSender === state.user.id && (
                            <img src={contact.profile?.image || admin} alt="chat" className="imgmsgcost" />
                            )}
                        </div>

                        <div className={ item.idSender !== state.user.id ? "chatadmin" : "chat"}>
                            <p>{item.message}</p>
                        </div>
                    </div>
                    </div>
                    ))}

                

                <input type="text" className="messagecost" placeholder="Sand Message.." onKeyPress={onSendMessage}/>
                </div>
            </div>
            </div>
    </Container>
  )
}

export default CustomerComplain