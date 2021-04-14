import ListGroup from 'react-bootstrap/ListGroup'

const FriendsList = () => {

  // const fetchFriendsHandler = () => {
    // fetch('https://njit-cs490-group6.github.io/api/v1/friends')
    // .then(response => {
    //   return response.json();
    // }).then(data => {
    //   console.log(data.results);
    // });
  // }
  // fetchFriendsHandler();
  const onClickFriend = () => {
    alert("Pull up friend profile");
  }

  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action onClick={onClickFriend}>
        Cras Odio
      </ListGroup.Item>
      <ListGroup.Item action onClick={onClickFriend}>
        Dapibus Facilisis
        </ListGroup.Item>
      <ListGroup.Item action onClick={onClickFriend}>
        Morbi Leo
        </ListGroup.Item>
      <ListGroup.Item action onClick={onClickFriend}>
        Porta Consectetur
      </ListGroup.Item>
      <ListGroup.Item action onClick={onClickFriend}>
        Vestibulum Eros
      </ListGroup.Item>
    </ListGroup>
  );
}

export default FriendsList;