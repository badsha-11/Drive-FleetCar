"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

const DeleteAlert = ({ handleDelete }) => {
  return (
    <AlertDialog>
      <Button
        className="w-full h-12 rounded-xl bg-red-600 text-white hover:bg-red-700"
        startContent={<Trash2 size={18} />}
      >
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-105 rounded-2xl">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Car?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-gray-600">
                Are you sure you want to delete this car?
              </p>

              <p className="mt-2 text-sm text-red-500">
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="flat">
                Cancel
              </Button>

              <Button
                color="danger"
                variant="danger"
                startContent={<Trash2 size={18} />}
                onClick={handleDelete }
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteAlert;
