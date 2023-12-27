from __future__ import absolute_import
from .Interface import Interface


class DrumPad(Interface):
    @staticmethod
    def serialize_drum_pad(drum_pad):
        if drum_pad is None:
            return None

        drum_pad_id = Interface.save_obj(drum_pad)
        return {
            "id": drum_pad_id,
            "name": drum_pad.name,
            "solo": drum_pad.solo,
            "mute": drum_pad.mute,
            "note": drum_pad.note,
        }
#not sure if this is needed
def __init__(self, c_instance, socket):
        super(DrumPad, self).__init__(c_instance, socket)

