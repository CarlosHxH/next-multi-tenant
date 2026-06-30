import { useState, useEffect } from 'react';

// Interface para o estado interno do hook
interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetch<T = unknown>(url: string, options?: RequestInit): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({data: null, loading: true, error: null});

    // Reseta o estado durante o render quando a URL muda, evitando exibir dados
    // do tenant anterior. Padrão recomendado pelo React em vez de setState no efeito.
    const [prevUrl, setPrevUrl] = useState(url);
    if (url !== prevUrl) {
        setPrevUrl(url);
        setState({ data: null, loading: true, error: null });
    }

    useEffect(() => {
        // AbortController cancela a requisição se o usuário sair da página
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                const response = await fetch(url, { ...options, signal });

                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }

                const jsonData = (await response.json()) as T;

                setState({ data: jsonData, loading: false, error: null });
            } catch (err) {
                // Evita atualizar o estado se a requisição foi abortada intencionalmente
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                setState({
                    data: null,
                    loading: false,
                    error: err instanceof Error ? err : new Error('Erro desconhecido'),
                });
            }
        };

        fetchData();
        // Função de limpeza (cleanup) do useEffect
        return () => {
            controller.abort();
        };
        // `options` é intencionalmente omitido: um objeto inline mudaria de
        // identidade a cada render e causaria um loop de requisições.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]); // Executa novamente apenas se a URL mudar

    return state;
}
