'use client'

import { useState, useEffect } from 'react';
import { Container, Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore, auth } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [user, setUser] = useState(null);
  const router = useRouter(); // Use router for navigation

  const updateInventory = async (userId) => {
    if (!userId) return;
    const inventoryRef = collection(firestore, `users/${userId}/inventory`);
    const snapshot = query(inventoryRef);
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        updateInventory(user.uid);
      } else {
        setUser(null);
        setInventory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Navigate to home page or login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: currentQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: Number(currentQuantity) + Number(quantity) });
    } else {
      await setDoc(docRef, { quantity: quantity });
    }
    await updateInventory(user.uid);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory(user.uid);
  };

  const removeAllItems = async (item) => {
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    await deleteDoc(docRef);
    await updateInventory(user.uid);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      marginTop={8}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Button variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="item-name"
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="item-quantity"
              label="Item Quantity"
              variant="outlined"
              fullWidth
              type="number" // Ensure it's a number input
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName, Number(itemQuantity));
                setItemName('');
                setItemQuantity('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>

      <Box width="100%" maxWidth={1000}>
        <TextField
          label="Search Items"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Box border={'1px solid #333'} height="600px">
          <Box
            height="80px"
            bgcolor={'#ADD8E6'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: 2,
                fontWeight: '600',
                color: 'darkblue',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: 1.5
              }}
            >
              Inventory Items
            </Typography>
          </Box>
          <Stack height="100%" spacing={2} overflow={'auto'}>
            {filteredInventory.length > 0 ? (
              filteredInventory.map(({ name, quantity }) => (
                <Box
                  key={name}
                  minHeight={60}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor="background.paper"
                  borderRadius={2}
                  boxShadow={2}
                  padding={3}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 6,
                      bgcolor: 'background.default',
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight="500"
                    textAlign="left"
                    sx={{ flex: 1 }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ flex: 1 }}
                  >
                    Quantity: {quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => removeItem(name)}
                    sx={{ marginRight: 2 }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => removeAllItems(name)}
                  >
                    Remove All
                  </Button>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No items found.
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
