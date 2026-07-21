"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Modal,
} from "@heroui/react";
import toast from "react-hot-toast";

const DeleteBookingModal = ({ id, onDelete }) => {
  const handleDelete = async () => {
  try {
    let token = null;

    await authClient.getSession({
      fetchOptions: {
        onSuccess: (ctx) => {
          token = ctx.response.headers.get("set-auth-jwt");
        },
      },
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      toast.success("Booking deleted successfully!");
      onDelete(id);
    } else {
      toast.error("Delete failed!");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!");
  }
};

  return (
    <Modal>
      <Button variant="danger">
        Delete
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog>

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Delete Booking
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              Are you sure you want to delete this booking?
            </Modal.Body>

            <Modal.Footer>

              <Button
                slot="close"
                variant="secondary"
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onPress={handleDelete}
              >
                Delete
              </Button>

            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteBookingModal;