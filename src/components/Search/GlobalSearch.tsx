import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/url";
import { useNavigate, useSearchParams } from "react-router-dom";

interface GlobalSearchParams {
  query: string;
}

const GlobalSearch = () => {
  const { register, handleSubmit, reset } = useForm<GlobalSearchParams>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSearch = (data: GlobalSearchParams) => {
    let newUrl = "";
    if (data.query.length === 0) {
      return;
    } else {
      newUrl = formUrlQuery({
        key: "query",
        params: searchParams.toString(),
        value: data.query,
      });
    }
    navigate(newUrl);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-lg">
      <InputGroup className="max-w-lg bg-muted">
        <InputGroupInput
          placeholder="Search products, brands and more"
          autoComplete="off"
          {...register("query")}
        />
        <InputGroupAddon>
          <Button variant={"link"} size={"icon"} type="submit">
            <Search />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default GlobalSearch;
