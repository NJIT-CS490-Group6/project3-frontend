import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const FriendsToolbar = () => {
  const onAddFriend = () => {
    alert('Send Friend Request');
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter Friend's Username"
        aria-label="Enter Friend's Username"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={onAddFriend}>Add</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default FriendsToolbar;

