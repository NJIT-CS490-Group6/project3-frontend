import ListGroup from 'react-bootstrap/ListGroup'

const FriendsList = () => {

  const onClickFriend = () => {
    alert("Pull up friend profile");
  }

  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item>
        Cras Odio
      </ListGroup.Item>
      <ListGroup.Item>
        Dapibus Facilisis
        </ListGroup.Item>
      <ListGroup.Item>
        Morbi Leo
        </ListGroup.Item>
      <ListGroup.Item>
        Porta Consectetur
      </ListGroup.Item>
      <ListGroup.Item onClick={onClickFriend}>
        Vestibulum Eros
      </ListGroup.Item>
    </ListGroup>
  );
}

export default FriendsList;