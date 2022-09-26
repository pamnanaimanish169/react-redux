// Add to cart via simple state

function handleAddToCart(item) {

    if(cartList?.find((element) => (element?.id === item?.id)))  {
      // update the item instead of setting it
      setCartList((cart) =>
        cart.map((cartItem) =>
          cartItem?.id === item?.id
            ? {
                ...cartItem,
                amount: cartItem.amount + 1
              }
            : cartItem
        )
      );
      return;
    } else {
      setCartList((cart) => [
        ...cart,
        {...item, amount : 1}
      ]);
    }
  }