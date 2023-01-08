# allow growth within the address space of a 64 bit machine along one axis
GROWTH_AXIS_MAX_DIGITS = 21  # = len(str(8*2**64-1)) hypothetical int1 dtype

def write_array_header(d, version=None):
    """ Write the header for an array and returns the version used
    Parameters
    ----------
    fp : filelike object
    d : dict
        This has the appropriate entries for writing its string representation
        to the header of the file.
    version : tuple or None
        None means use oldest that works. Providing an explicit version will
        raise a ValueError if the format does not allow saving this data.
        Default: None
    """
    header = ["{"]
    header_values = []
    for key, value in sorted(d.items()):
        # Need to use repr here, since we eval these when reading
        header_values.append("'%s': %s" % (key, repr(value)))

    header_values_string = ", ".join(header_values)
    header.append(header_values_string)
    header.append("}")
    header = "".join(header)
    
    # Add some spare space so that the array header can be modified in-place
    # when changing the array size, e.g. when growing it by appending data at
    # the end. 
    shape = d['shape']
    header += " " * ((GROWTH_AXIS_MAX_DIGITS - len(repr(
        shape[0]
    ))) if len(shape) > 0 else 0)

    # if version is None:
    #     header = _wrap_header_guess_version(header)
    # else:
    #     header = _wrap_header(header, version)

    return header