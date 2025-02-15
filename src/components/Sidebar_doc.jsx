import React from 'react'
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function Sidebar_doc() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='sideBar bg-slate-800 flex flex-col items-center lg:h-screen w-full lg:w-80 p-3  '>
      <Button className='bg-green-300 rounded-3xl max-w-max px-10 py-0  my-2' type="button" onClick={() => setOpenModal(true)}>Add a new Patient</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add a New Patient</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='w-max'>
      <form className=''>
      <i class="fa-solid fa-magnifying-glass pr-2 text-white"></i>
      <input type="search" placeholder='Search Patient' className='max-h-7 rounded-xl'></input>
      </form>
      </div>
    </div>
  )
}
